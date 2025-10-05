import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/client";

const PRIVACY_POLICY_QUERY = defineQuery(`
    *[_type == "dataPrivacyPolicy"] [0] {
      policy
    }
  `);

export const getPrivacyPolicyContent = async () => {
  const content = await sanityFetch({
    query: PRIVACY_POLICY_QUERY,
  });
  console.log({ content });

  return content;
};
