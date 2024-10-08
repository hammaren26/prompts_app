"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";
import { addHashToTagsString } from "@utils/tagUtils";

const UpdatePrompt = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null); // Для хранения ошибок

  useEffect(() => {
    const getPromptDetails = async () => {
      if (!promptId) {
        setError("Пропущен идентификатор заметки!");
        return;
      }

      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error("Ошибка при получении данных");
        }

        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        setError(error.message); // Устанавливаем ошибку
        console.error(error);
      }
    };

    getPromptDetails();
  }, [promptId]);

  const updatePrompt = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    if (!promptId) {
      alert("Пропущена заметка!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: post.prompt,
          tag: addHashToTagsString(post.tag),
          date: new Date(),
        }),
      });

      if (!response.ok) {
        throw new Error("Ошибка при обновлении заметки");
      }

      router.push("/"); // Перенаправляем после успешного обновления
    } catch (error) {
      setError(error.message); // Устанавливаем ошибку
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {error && <p className="error">{error}</p>} {/* Показываем ошибку */}
      <Form
        type="Редактировать"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={updatePrompt}
      />
    </div>
  );
};

const Page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UpdatePrompt />
    </Suspense>
  );
};

export default Page;
