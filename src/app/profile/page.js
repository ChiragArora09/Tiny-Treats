"use client";
import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Upload } from "@mui/icons-material";

const profilePage = () => {
  const session = useSession();
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const { status } = session;

  useEffect(() => {
    if(status==='authenticated'){
      setUsername(session.data.user.name)
      setImage(session.data.user.image)
      fetch('/api/profile').then(response => {
        response.json().then(data => {
          console.log(data)
          setPhone(data.phone)
          setPostalCode(data.postalCode)
          setAddress(data.address)
          setCity(data.city)
          setCountry(data.country)
          setUsername(data.name)
          setImage(data.image)
          
        })
      })
    }
  }, [session, status])

  const handleProfileInfo = async (e) => {
    e.preventDefault();
    const savingPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("/api/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, image, address, postalCode, phone, city, country }),
      });
      if (res.ok) resolve();
      else reject();
    });
    await toast.promise(savingPromise, {
      loading: "Saving...",
      success: "Profile saved!",
      error: "Error",
    });
  };

  const handleImageChange = async (e) => {
    const files = e.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then((response) => {
        if (response.ok) {
          return response.json().then((link) => {
            setImage(link);
          });
        }
        throw new Error("Oops! Something went wrong");
      });

      await toast.promise(uploadPromise, {
        loading: "Uploading...",
        success: "Upload complete",
        error: "Upload error",
      });
    }
  };

  if (status === "loading") {
    return "Loading...";
  }
  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <section className="mt-20">
      <h1 className="text-center text-primary text-4xl mb-8">My Account</h1>
      <div className="max-w-xl mx-auto border border-gray-200 shadow-lg px-10 py-8 rounded-xl ">
        <div className="flex gap-4">
          <div className="flex flex-col items-center gap-1">
            {image && (
              <>
                <Image
                  src={image}
                  width={100}
                  height={100}
                  className="rounded-full"
                  alt="avatar"
                />
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label className="cursor-pointer" htmlFor="file">
                  <span className="text-black text-xs border border-gray-600 px-1 py-0.5 rounded-md">
                    Change Avatar
                  </span>
                </label>
              </>
            )}
            {!image && (
              <>
                <div className="flex flex-col items-center bg-white justify-center w-20 h-20 rounded-full ">
                  <div className="text-7xl text-primary">
                    {session.data.user.email[0]}
                  </div>
                  <div className="h-2 w-2"></div>
                </div>

                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={handleImageChange}
                />
                <label className="cursor-pointer" htmlFor="file">
                  <span className="text-black text-xs border border-gray-600 px-1 py-0.5 rounded-md">
                    Change Avatar
                  </span>
                </label>
              </>
            )}
          </div>
          <form className="grow" onSubmit={handleProfileInfo}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              disabled={true}
              value={session.data.user.email}
            />
            <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)}/>
            <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)}/>
            <div className="flex gap-2">
              <input type="text" placeholder="PinCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
              <input type="text" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} />
            </div>
            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} />
            <button className="bg-green-500" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default profilePage;
