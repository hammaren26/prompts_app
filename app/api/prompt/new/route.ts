import Prompt from "@models/prompt";
import { connectToDB } from "@utils/database";

export const POST = async (request: Request) => {
  const { prompt, userId, tag, date } = await request.json();

  try {
    await connectToDB();

    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
      date: date,
    });

    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.error("Error saving new prompt:", error); // Логируем ошибку
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
};
