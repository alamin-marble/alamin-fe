import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
export default function Search() {
  const router = useRouter();
  const [t] = useTranslation();
  const [searchTerm, setSearchTerm] = useState();

  const AddHandleSubmit = async (e) => {
    e.preventDefault();
    console.log("someting");
    router.push(`/Search?SearchTerm=${searchTerm}`);
  };

  return (
    <form onSubmit={AddHandleSubmit}>
      <input
        type="text"
        name="SearchTerm"
        placeholder={t("search")}
        className="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </form>
  );
}
