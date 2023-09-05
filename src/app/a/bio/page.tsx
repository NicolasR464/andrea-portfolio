import BioForm from "./bio-form";

const bioFetch = async () => {
  const bio = await fetch(process.env.DOMAIN + "/api/about", {
    next: { tags: ["bio"] },
  });

  const bioParsed = await bio.json();

  return bioParsed;
};

export default async function Bio() {
  const data: any = await bioFetch();

  return (
    <div>
      <h1 className="text-center text-5xl">BIO</h1>
      <BioForm bioText={data.bio.text} bioImgUrl={data?.bio?.image?.url} />
    </div>
  );
}
