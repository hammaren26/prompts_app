import Feed from "@components/Feed";

const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Создавайте и сохраняйте
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">ваши личные заметки</span>
      </h1>
      <p className="desc text-center">
        Легко создавайте и сохраняйте свои личные заметки для будущего
        использования. Организуйте идеи, мысли и важные моменты, чтобы всегда
        иметь к ним доступ.
      </p>

      <Feed />
    </section>
  );
};

export default Home;
