import Image from "next/image";

const bioFetch = async () => {
  const bio = await fetch(process.env.DOMAIN + "/api/about", {
    next: { tags: ["bio"] },
  });

  const bioParsed = await bio.json();

  return bioParsed;
};

export default async function About() {
  const data = await bioFetch();
  console.log(data);

  return (
    <article className="w-screen  flex justify-center flex-col items-center bg-base-100 shadow-lg">
      <Image
        className="rounded-sm max-w-80"
        src={
          data.bio.image.url ||
          "https://res.cloudinary.com/niikkoo/image/upload/v1690478214/andrea-drawing-portfolio-dev/drawing-pics/yx47ijonvmv6vediygua.jpg"
        }
        alt="Picture of the author"
        width={400}
        height={400}
      />
      <p className="text-center m-3 max-w-2-3">{data.bio.text}</p>
    </article>
  );
}
