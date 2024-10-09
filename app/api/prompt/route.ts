import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate("creator");

    // Создаем объект ответа с заголовками
    const response = new Response(JSON.stringify(prompts), { status: 200 });
    response.headers.set("Cache-Control", "no-store"); // Отключаем кэширование

    return response;
  } catch (error) {
    const errorResponse = new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
      }
    );
    errorResponse.headers.set("Cache-Control", "no-store"); // Отключаем кэширование в случае ошибки

    return errorResponse;
  }
};
