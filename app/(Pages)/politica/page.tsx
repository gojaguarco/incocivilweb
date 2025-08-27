import { getPrivacyPolicyContent } from "@/sanity/queries/privacyPolicyQueries";
import TextBlock from "../_components/TextBlock";

const Page = async () => {
  const content = await getPrivacyPolicyContent();

  console.log({ content });
  if (content)
    return (
      <div className="w-full z-10">
        <section className="bg-light-dark min-h-screen w-full relative z-20 flex flex-col gap-5 py-10 px-5 md:px-10 xl:px-48 mx-auto">
          <TextBlock value={content.policy} />
        </section>
      </div>
    );
};

export default Page;
