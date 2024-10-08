import { useSession } from "next-auth/react";

const Profile = () => {
  const { data: session } = useSession();

  // Проверяем, есть ли данные сессии и пользователь
  if (!session || !session.user) {
    return <div>Загрузка...</div>; // Или другое сообщение об ошибке
  }

  const { image, name, email, id } = session.user;

  return (
    <>
      <section className="w_full">
        <h1 className="head_text text-left">
          <span className="blue_gradient">Мой профиль</span>
        </h1>
        <p className="desc text-left">Добро пожаловать в ваш профиль</p>
      </section>

      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center space-x-6">
          <img
            src={image}
            alt="Profile Image"
            className="w-24 h-24 rounded-full shadow-md"
          />

          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            <p className="text-gray-600">ID: {id}</p>
            <p className="text-gray-600">Email: {email}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
