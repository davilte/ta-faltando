import { LoginDTO } from "~/src/types/auth";
import { config } from '~/src/config';

export async function loginRequest(data: LoginDTO) {
    const response = await fetch(`${config.API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
    }

    const result = await response.json();
    console.log("Login successful:", result);
    return result; // e.g., { token: "..." }
}