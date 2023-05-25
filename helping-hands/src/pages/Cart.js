import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import TextField from "@mui/material/TextField";
import BackupIcon from "@mui/icons-material/Backup";

const Newproduct = () => {
  const [data, setData] = useState({
    name: "",
    image: "",
    description: "",
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const uploadImage = async (e) => {
    const data = await ImagetoBase64(e.target.files[0]);
    // console.log(data)

    setData((preve) => {
      return {
        ...preve,
        image: data,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    const { name, image, description } = data;

    if (name && image && description) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMIN}/uploadProduct`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      const fetchRes = await fetchData.json();

      toast(fetchRes.message);

      setData(() => {
        return {
          name: "",
          image: "",
          description: "",
        };
      });
    } else {
      toast("Enter required Fields");
    }
  };
  return (
    <div className="p-4">
      <form
        className="m-auto w-full max-w-md  shadow flex flex-col p-3 bg-white"
        onSubmit={handleSubmit}
      >
        <TextField
          id="filled-hidden-label-small"
          label="Name"
          style={{ marginBottom: 16 }}
          variant="outlined"
          name="name"
          onChange={handleOnChange}
          value={data.name}
        />

        <label htmlFor="image" style={{ marginBottom: 16 }}>
          Image
          <div className="h-40 w-full bg-slate-200  rounded flex items-center justify-center cursor-pointer">
            {data.image ? (
              <img src={data.image} className="h-full" />
            ) : (
              <span className="text-5xl">
                <BackupIcon />
              </span>
            )}

            <input
              type={"file"}
              accept="image/*"
              id="image"
              onChange={uploadImage}
              className="hidden"
            />
          </div>
        </label>
        <TextField
          style={{ marginBottom: 16 }}
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          defaultValue={data.description}
          name="description"
          onChange={handleOnChange}
        />

        <button className="bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium my-2 drop-shadow">
          Save
        </button>
      </form>
    </div>
  );
};

export default Newproduct;
