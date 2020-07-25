export default function Layout(frontMatter) {
  return ({ children: content }) => {
    return (
      <div className="flex justify-center items-center">
        <div className="container flex flex-col justify-center items-center my-8">
          <div className="text-3xl font-bold">{frontMatter.title}</div>
          <div className="p-4">{content}</div>
        </div>
      </div>
    );
  };
}
