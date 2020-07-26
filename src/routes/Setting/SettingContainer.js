import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useQuery, useMutation } from "react-apollo-hooks";
import { EDIT_USER, EDIT_PHOTO } from "./SettingQueries";
import { ME } from "../../SharedQueries";
import useInput from "../../hooks/useInput";
import SettingPresenter from "./SettingPresenter";
import { toast } from "react-toastify";

export default () => {
  const fileInput = useRef(null);
  const name = useInput("");
  const email = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const bio = useInput("");
  const avatar = useInput("");
  const [modal, setModal] = useState(false);
  const { data, loading, refetch } = useQuery(ME);
  const [editUserMutation, { loading: uLoading }] = useMutation(EDIT_USER, {
    variables: {
      name: name.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value,
      bio: bio.value,
    },
  });

  const [editPhotoMutation, { loading: pLoading }] = useMutation(EDIT_PHOTO);

  useEffect(() => {
    if (data !== undefined) {
      name.setValue(data.me.name);
      email.setValue(data.me.email);
      firstName.setValue(data.me.firstName);
      lastName.setValue(data.me.lastName);
      bio.setValue(data.me.bio);
      avatar.setValue(data.me.avatar);
    }
  }, [data]);

  const onClick = (e) => {
    fileInput.current.click();
  };

  const onChange = async (e) => {
    const fileUploaded = e.target.files[0];
    const formData = new FormData();
    formData.append("file", fileUploaded);
    try {
      const {
        data: { location, key },
      } = await axios.post("http://localhost:4000/api/upload/", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      await editPhotoMutation({
        variables: { file: location, key },
      });
      await refetch();
      setModal(false);
    } catch (e) {
      console.log("Error : ", e);
    }
  };

  const onDelete = async () => {
    await axios.post("http://localhost:4000/api/delete", {
      Key: data.me.avatarKey,
    });
    await editPhotoMutation({
      variables: {
        file:
          "https://images-na.ssl-images-amazon.com/images/I/51e6kpkyuIL._AC_SX466_.jpg",
        key: "",
      },
    });
    await refetch();
    setModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (
      name.value === "" ||
      email.value === "" ||
      (firstName.value === "" && lastName.value === "")
    ) {
      return toast.error("Name, Email, FirstName and LastName are required");
    } else {
      await editUserMutation();
      await refetch();
    }
  };

  return (
    <SettingPresenter
      data={data}
      loading={loading}
      uLoading={uLoading}
      pLoading={pLoading}
      name={name}
      email={email}
      firstName={firstName}
      lastName={lastName}
      bio={bio}
      avatar={avatar}
      onSubmit={onSubmit}
      onClick={onClick}
      onChange={onChange}
      fileInput={fileInput}
      modal={modal}
      setModal={setModal}
      onDelete={onDelete}
    />
  );
};
