

export const generateRandomString = (number) => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < number; ++i) {
        result += characters[Math.floor(Math.random() * characters.length)];
    }

    return result;
}