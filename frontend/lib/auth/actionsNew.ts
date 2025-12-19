"use server";

import { cookies, headers } from "next/headers";
import { randomUUID } from "crypto";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: false, // در development false است
  sameSite: "lax" as const,
  path: "/",
  maxAge: 60 * 60 * 24 * 7, // 7 days
};

export async function createGuestSession() {
  const cookieStore = await cookies();
  const existing = cookieStore.get("guest_session");
  
  if (existing?.value) {
    return { ok: true, sessionToken: existing.value };
  }

  const sessionToken = randomUUID();
  cookieStore.set("guest_session", sessionToken, COOKIE_OPTIONS);
  
  return { ok: true, sessionToken };
}

export async function getCurrentUser() {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get("guest_session");
    
    if (sessionToken?.value) {
      return {
        id: sessionToken.value,
        isGuest: true,
        sessionToken: sessionToken.value
      };
    }
    
    return null;
  } catch (error) {
    console.error("Error getting current user:", error);
    return null;
  }
}

export async function signIn(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    // TODO: Backend authentication integration
    // برای حالا فقط session ایجاد می‌کنیم
    await createGuestSession();

    return {
      ok: true,
      userId: randomUUID(),
      message: "ورود موفق"
    };
  } catch (error) {
    console.error("Error signing in:", error);
    return {
      ok: false,
      message: "خطا در ورود"
    };
  }
}

export async function signUp(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const name = formData.get("name");

    // TODO: Backend registration integration
    // برای حالا فقط session ایجاد می‌کنیم
    await createGuestSession();

    return {
      ok: true,
      userId: randomUUID(),
      message: "ثبت‌نام موفق"
    };
  } catch (error) {
    console.error("Error signing up:", error);
    return {
      ok: false,
      message: "خطا در ثبت‌نام"
    };
  }
}

export async function signOut() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("guest_session");
    
    return {
      ok: true,
      message: "خروج موفق"
    };
  } catch (error) {
    console.error("Error signing out:", error);
    return {
      ok: false,
      message: "خطا در خروج"
    };
  }
}
