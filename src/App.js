import "./styles.css";
import React, { createRef, useRef, useState, Fragment } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import "bootstrap/dist/css/bootstrap.min.css";
export default function App() {
  const [addSite, setAddSite] = useState({
    name: "",
    description: "",
    image: []
  });
  const [changeImageFileIndex, setChangeImageFileIndex] = useState(null);
  const imageFilesRef = useRef();

  const handleClickFile = () => {
    imageFilesRef.current.click();
  };
  const handleChangeFile = (e) => {
    let existFile = [...addSite.image];
    console.log(existFile);
    if (!existFile[changeImageFileIndex]) {
      setAddSite({
        ...addSite,
        image: [...addSite.image, e.target.files[0]]
      });
    } else {
      existFile[changeImageFileIndex] = e.target.files[0];
      setAddSite({
        ...addSite,
        image: existFile
      });
    }
  };
  return (
    <div className="vh-100">
      <div className="relative-middle text-center">
        <div className="row p-2 row-cols-sm-2 row-cols-1">
          <div className="image-col ">
            <input
              type="file"
              className="d-none"
              ref={imageFilesRef}
              onChange={(e) => {
                handleChangeFile(e);
              }}
              onClick={(e) => {
                e.target.value = null;
              }}
            />
            {addSite.image.length === 0 ? (
              <button
                className="img-btn"
                onClick={() => {
                  setChangeImageFileIndex(0);
                  handleClickFile();
                }}
              >
                <AiOutlinePlus
                  size={180}
                  style={{
                    border: "1px solid rgb(124, 123, 123)",
                    borderRadius: "10px",
                    width: "180px",
                    aspectRatio: "1/1",
                    objectFit: "cover"
                  }}
                />
              </button>
            ) : (
              <div className="position-relative">
                <button
                  className="img-btn"
                  onClick={() => {
                    handleClickFile();
                  }}
                >
                  <img
                    src={URL.createObjectURL(addSite.image[0])}
                    style={{
                      border: "1px solid rgb(124, 123, 123)",
                      borderRadius: "10px",
                      width: "180px",
                      aspectRatio: "1/1",
                      objectFit: "cover"
                    }}
                  />
                </button>
              </div>
            )}

            {addSite.image.length > 0 && (
              <div className="row row-cols-4 position">
                {addSite.image.map((e, i) => {
                  if (i + 1 === addSite.image.length) {
                    return (
                      <button
                        key={i}
                        className="img-btn"
                        onClick={() => {
                          setChangeImageFileIndex(i + 1);
                          handleClickFile();
                        }}
                        style={{
                          aspectRatio: "1/1",
                          border: "1px solid rgb(124, 123, 123)",
                          borderRadius: "10px",
                          objectFit: "cover"
                        }}
                      >
                        <AiOutlinePlus size={40} />
                      </button>
                    );
                  } else {
                    return (
                      <Fragment key={i}>
                        <button
                          className="img-btn"
                          onClick={() => {
                            setChangeImageFileIndex(i + 1);
                            handleClickFile();
                          }}
                        >
                          <img
                            src={URL.createObjectURL(addSite.image[i + 1])}
                            style={{
                              border: "1px solid rgb(124, 123, 123)",
                              borderRadius: "10px",
                              maxWidth: "100%",
                              aspectRatio: "1/1",
                              objectFit: "cover"
                            }}
                          />
                        </button>
                      </Fragment>
                    );
                  }
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
