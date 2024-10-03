"use server";
import { getCollection } from "@/library/db";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";

function isAlphaNumeric(x) {
  // email address regex: ^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$ or
  // ^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$
  const regex = /^[a-zA-Z0-9]*$/;
  return regex.test(x);
}

export const logout = async function () {
  cookies().delete("removalscookies");
  redirect("/");
};

export const login = async function (prevState, formData) {
  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  if (typeof ourUser.username != "string") ourUser.username = "";
  if (typeof ourUser.password != "string") ourUser.password = "";

  const collection = await getCollection("users");
  const user = await collection.findOne({ username: ourUser.username });

  if (!user) {
    return {
      success: false,
      message: "Invalid username",
    };
  }

  const checkPassword = bcrypt.compareSync(ourUser.password, user.password);

  if (!checkPassword) {
    return {
      success: false,
      message: "Wrong password",
    };
  }

  // create our JWT value
  const tokenValue = jwt.sign(
    { userId: user._id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    process.env.JWTSECRET
  );

  //Log the user in by giveng them a cookie
  cookies().set("removalscookies", tokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24, //cookie for 24 hours
    secure: true,
  });
  return redirect("/");
};

export const register = async function (prevState, formData) {
  const errors = {};
  const ourUser = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const confirmPassword = formData.get("confirmPassword");

  if (typeof ourUser.username != "string") ourUser.username = "";
  if (typeof ourUser.password != "string") ourUser.password = "";

  ourUser.username = ourUser.username.trim();
  ourUser.password = ourUser.password.trim();

  if (ourUser.username.length < 3)
    errors.username = "Username must be at least 3 characters";
  if (ourUser.username.length > 20)
    errors.username = "Username cannot exceed 20 characters";
  if (!isAlphaNumeric(ourUser.username))
    errors.username = "Username can only contain letters and numbers";
  if (ourUser.username == "") errors.username = "You must provide a username";

  // Check is username is unique
  const usersCollection = await getCollection("users");
  const usernameUnique = await usersCollection.findOne({
    username: ourUser.username,
  });
  if (usernameUnique) {
    errors.username = "That username is already in use.";
  }

  if (ourUser.password.length < 8)
    errors.password = "Password must be at least 8 characters";
  if (ourUser.password.length > 40)
    errors.password = "Password cannot exceed 40 characters";
  if (ourUser.password == "") errors.password = "You must provide a password";

  if (ourUser.password !== confirmPassword)
    errors.confirmPassword = "Passwords don't match";

  if (errors.username || errors.password) {
    return {
      errors: errors,
      success: false,
    };
  }

  // hash password
  const salt = bcrypt.genSaltSync(10);
  ourUser.password = bcrypt.hashSync(ourUser.password, salt);

  //Store a new user in the database.
  //const usersCollection = await getCollection("users");
  const newUser = await usersCollection.insertOne(ourUser);
  const userId = newUser.insertedId.toString();

  // create our JWT value
  const tokenValue = jwt.sign(
    { userId: userId, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 },
    process.env.JWTSECRET
  );

  //Log the user in by giveng them a cookie
  cookies().set("removalscookies", tokenValue, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24, //cookie for 24 hours
    secure: true,
  });
  return {
    success: true,
  };
};
