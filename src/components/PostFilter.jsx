//import React from "react";
import MyInput from "./UI/input/MyInput";
import MySelect from "./UI/select/MySelect";
const PostFilter = ({ filter, setFilter }) => {
  return (
    <div>
      {" "}
      <MyInput
        placeholder="Search"
        value={filter.query}
        onChange={(event) =>
          setFilter({ ...filter, query: event.target.value })
        }
      ></MyInput>
      <MySelect
        value={filter.sort}
        onChange={(selectedSort) =>
          setFilter({ ...filter, sort: selectedSort })
        }
        defaultValue="Sort"
        options={[
          { value: "title", name: "by Name" },
          { value: "body", name: "by Description" },
        ]}
      />
    </div>
  );
};
export default PostFilter;
