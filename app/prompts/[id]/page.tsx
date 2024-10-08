"use client";

import { formatDateString } from "@utils/dateUtils";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";

const page = ({ params }: { params: { id: string } }) => {
  const promptId = params.id;
  const [post, setPost] = useState({ prompt: "", tag: "", _id: "", date: "" });

  const router = useRouter();

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    if (confirm("Вы уверены, что хотите удалить эту заметку?")) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });

        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  useLayoutEffect(() => {
    const getPromptDetails = async () => {
      const response = await fetch(`/api/prompt/${promptId}`);
      const data = await response.json();

      setPost({
        prompt: data.prompt,
        tag: data.tag,
        _id: data._id,
        date: data.date,
      });
    };

    if (promptId) getPromptDetails();
  }, []);

  return (
    <>
      <div className="max-w-4xl mx-auto p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Ваша заметка
          </h1>
        </header>

        {post.prompt !== "" ? (
          <>
            <p className="text-sm text-gray-500 mb-4">
              Опубликовано: {formatDateString(post.date)}
            </p>
            <article className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg text-gray-700 leading-relaxed">
                {post.prompt}
              </p>
            </article>

            <div className="flex space-x-4 mt-4">
              <button
                onClick={() => handleEdit(post)}
                className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
              >
                Редактировать
              </button>

              <button
                onClick={() => handleDelete(post)}
                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300"
              >
                Удалить
              </button>
            </div>
          </>
        ) : (
          <p className="text-lg text-gray-700 leading-relaxed">Загрузка...</p>
        )}
      </div>
    </>
  );
};

export default page;
