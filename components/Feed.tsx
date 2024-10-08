"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick, searchText }) => {
  if (searchText) {
    data = data.filter((post) => {
      return post.prompt.includes(searchText) || post.tag.includes(searchText);
    });
  }

  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const { data: session, status } = useSession();
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const fetchPosts = async () => {
    const response = await fetch(`/api/prompt`);
    const data = await response.json();

    console.log("Posts:", data);

    setPosts(data);
  };

  useEffect(() => {
    // Выполняем запрос только если пользователь авторизован
    if (session?.user) {
      fetchPosts();
    }
  }, [session]);

  //   // Пока сессия загружается
  //   if (status === "loading") {
  //     return <p>Загрузка...</p>;
  //   }

  // Если пользователь не авторизован, показываем сообщение
  if (!session?.user) {
    return (
      <p className="text-center mt-8">
        <strong>
          Пожалуйста, авторизуйтесь, чтобы просмотреть свои заметки
        </strong>
      </p>
    );
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Введите тег или текст для поиска"
          className="search_input peer"
          value={searchText}
          onChange={handleSearchChange}
          required
        />
      </form>

      {posts.length > 0 ? (
        <PromptCardList
          data={posts}
          searchText={searchText}
          handleTagClick={() => {}}
        />
      ) : null}
    </section>
  );
};

export default Feed;
