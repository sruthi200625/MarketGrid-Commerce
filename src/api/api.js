const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function readResponse(response) {
  const text = await response.text();
  let data = {};

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    data = { message: text };
  }

  if (!response.ok) {
    throw new Error(data.message || data.error || "Request failed");
  }

  return data;
}

export async function loginUser(email, password, role = "CUSTOMER") {
  const response = await fetch(`${API_BASE_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      role,
    }),
  });

  return readResponse(response);
}

export async function registerUser({ name, email, password, role = "CUSTOMER" }) {
  const response = await fetch(`${API_BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      Accept: "*/*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role }),
  });

  return readResponse(response);
}