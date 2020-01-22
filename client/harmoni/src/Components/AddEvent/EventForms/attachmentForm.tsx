import React, { useState, useEffect } from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import ListGroup from "react-bootstrap/ListGroup";
import "react-bootstrap-typeahead/css/Typeahead.css";
import Button from "../../Button/button";
import styled from "styled-components";
import ArtistCard from "./artistCard";

interface userRight {
  users: IUser[];
  attachment: attachment;
}

interface attachment {
  attachment_id: number;
  user_id: number;
  event_id: number;
  data: File;
  filename: string;
  filetype: string;
  filesize: number;
}
interface IUser {
  user_id: number;
  name: string;
  email: string;
  mobile: number;
  hash: string;
  salt: string;
  type: string;
  picture: string;
}

const Wrapper = styled.div`
  height: 100%;
  margin-top: 20px;
  grid-gap: 10px;
  display: grid;
`;

const AttachmentWrapper = styled.div`
  display: grid;
  border: dashed 3px #bbbbbb;
  grid-template-rows: 5fr 3fr;
  border-radius: 10px;
`;

const DelBtn = styled.img`
  cursor: pointer;
  height: 30%;
  margin-left: 10px;
`;

const Input = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const UnderTitle = styled.h3`
  font-size: 24px;
`;

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  margin-bottom: 10px;
`;

const Text = styled.p`
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  color: #222222;
`;

const FilenameText = styled.label`
  font-family: Arial;
  font-size: 20px;
  margin: 0;
  justify-self: start;
  font-weight: bold;
  color: #434343;
`;

const FileUploadWrapper = styled.div`
  width: 400px;
  height: 60px;
  background: #e0e0e0;
  display: grid;
  align-items: center;
  justify-items: center;
  cursor: pointer;
  border-radius: 5px;

  :hover {
    filter: brightness(95%);
  }

  :active {
    filter: brightness(98%);
  }
`;

const FileUploadText = styled.p`
  font-size: 22px;
  color: #222222;
  margin: 0;
  font-weight: bold;
`;

const NoAttachmentsText = styled.p`
  font-size: 26px;
  color: #444444;
  margin: 0;
  font-weight: bold;
`;

const AddAttachmentButtonWrapper = styled.div`
  margin: 17px 0;
`;

const AttachmentForm = (props: any) => {
  const [currAttachment, setCurrAttachment] = useState<attachment>(null);
  const [readyToUpload, setReadyToUpload] = useState<boolean>(false);
  const [fileInputName, setFileInputName] = useState<string>("");
  const [tempAttachmentRights, setTempAttachmentRights] = useState<userRight>({
    users: [],
    attachment: null
  });

  const [listOfArtists, setListOfArtists] = useState<IUser[]>([]);

  let typeahead;

  useEffect(() => {
    setListOfArtists(props.listOfArtists);
  }, [tempAttachmentRights]);

  const removeUserTemp = (attachment, user) => () => {
    let array = {
      users: [],
      attachment: null
    };
    array.users = tempAttachmentRights.users.filter(e => {
      console.log(e);
      return e.user_id != user.user_id;
    });
    array.attachment = currAttachment;
    setTempAttachmentRights(array);
  };

  const removeFileTemp = attachment => () => {
    setTempAttachmentRights({
      users: [],
      attachment: null
    });
    setCurrAttachment(null);
    setFileInputName("");
  };

  //Add attachment and all the assosiated user-rights.
  const addAttachment = (file: attachment) => {
    if (!file)
      console.log("File is undefined or null, button should be disabled");
    let exists = props.listOfAttachments.some(e => e.filename == file.filename);
    if (!exists) {
      props.setListOfAttachments(array => [...array, file]);
      props.setListOfAttachmentsRights(array => [
        ...array,
        tempAttachmentRights
      ]);
      setTempAttachmentRights({ users: [], attachment: null });
      setCurrAttachment(null);
    } else {
      //TODO: Display error
    }
    setReadyToUpload(false);
    console.log(fileInputName);
    setFileInputName("");
  };

  const addUser = user => {
    let userRight = {
      user: user,
      attachment: currAttachment
    };
    if (user != null) {
      let exists = tempAttachmentRights.users.some(e => {
        return e.user_id == userRight.user.user_id;
      });
      console.log(exists ? "Exists!" : "Doesn't exist!");
      if (!exists) {
        let array = {
          users: [],
          attachment: null
        };
        array.users = tempAttachmentRights.users.map(e => e);
        array.users.push(user);
        array.attachment = currAttachment;
        setTempAttachmentRights(array);
      }
    }
    typeahead.clear();
  };

  const removeUser = (attachment, user) => () => {
    let userRight = {
      user: user,
      attachment: attachment
    };
    console.log(userRight);

    let indexOfFile;
    //Find the correct file
    console.log(props.listOfAttachmentsRights);
    let files = props.listOfAttachmentsRights.filter(e => {
      console.log(e);
      return e.attachment.filename === userRight.attachment.filename;
    });

    //Remove the user from the access list
    files[0].users = files[0].users.filter(e => {
      console.log(e);
      return e.user_id != user.user_id;
    });
    props.listOfAttachmentsRights[indexOfFile] = files;
    props.setListOfAttachmentsRights(array => [...array]);
  };

  const removeFile = attachment => () => {
    console.log("Removeing file: ", attachment);
    let attachments = props.listOfAttachments;
    attachments = attachments.filter(e => e.filename !== attachment.filename);
    props.setListOfAttachments(attachments);
    let attachmentRights = props.listOfAttachmentsRights;
    attachmentRights = attachmentRights.filter(
      e => e.attachment.filename !== attachment.filename
    );
    props.setListOfAttachmentsRights(attachmentRights);
  };

  const getUsersforAttachment = attachment_filename => {
    return props.listOfAttachmentsRights.find(e => {
      console.log(e);
      console.log(attachment_filename);
      return attachment_filename == e.attachment.filename;
    });
  };

  const handleChange = e => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) return;
    // setFile(e.target.files[0]);

    let reader = new FileReader();
    let file = e.target.files[0];
    const filename = file.name;
    const filesize = file.size;
    const filetype = file.type;

    reader.onloadend = () => {
      console.log("Uploaded file...", reader);
      console.log("Upload result: ", reader.result);
      let att: attachment = {
        attachment_id: -1,
        data: file,
        event_id: -1,
        filename: filename,
        filesize: filesize,
        filetype: filetype,
        user_id: -1
      };
      console.log("The attachment: ", att);
      setCurrAttachment(att);
      let tempRights = tempAttachmentRights;
      tempRights.attachment = att;
      setTempAttachmentRights(tempRights);
      setFileInputName(filename);
    };
    reader.readAsBinaryString(e.target.files[0]);
    setReadyToUpload(true);
  };

  return (
    <>
      <Title>Vedlegg</Title>
      <Text>
        Du kan legge til og endre vedlegg og hvem som skal ha tilgang til disse
        ved å redigere arrangementet i min side.
      </Text>

      {/* Input type file, ListGroup with ArtistCards? */}
      <Wrapper>
        <UnderTitle>Legg til vedlegg:</UnderTitle>
        <Input
          accept="*/*"
          id="attachment-upload"
          type="file"
          formEncType="multipart/form-data"
          onChange={e => handleChange(e)}
          name="file"
        />
        <label htmlFor="attachment-upload">
          <FileUploadWrapper>
            <FileUploadText>
              {fileInputName ? fileInputName : "Velg fil"}
            </FileUploadText>
          </FileUploadWrapper>
        </label>
        <UnderTitle>Lesetilgang:</UnderTitle>
        <Text>Legg til brukere som skal ha tilgang</Text>
        {readyToUpload ? (
          <>
            <Typeahead
              id="choose-attachment-rights"
              labelKey={artistName => {
                return artistName.name;
              }}
              options={listOfArtists.map(user => user)}
              onChange={s => addUser(s[0])}
              placeholder="Søk etter brukere..."
              emptyLabel="Du må legge til artister i steg 2."
              ref={elem => (typeahead = elem)}
            />
            {currAttachment ? (
              <ListGroup>
                {[currAttachment].map(e => {
                  console.log(e);
                  let rights = tempAttachmentRights;
                  console.log(rights);
                  let RightsJSX = rights.users.map(data => {
                    console.log(data);
                    return (
                      <>
                        <ArtistCard
                          artist={data}
                          remove={removeUserTemp(e, data)}
                        />
                      </>
                    );
                  });
                  return (
                    <div key={e.filename}>
                      <div>
                        <img
                          width="55px"
                          height="55px"
                          src="https://cdn0.iconfinder.com/data/icons/popular-files-formats/154/tmp-512.png"
                        />
                        <FilenameText>{e.filename}</FilenameText>
                        <DelBtn
                          src="/icons/cross.svg"
                          onClick={removeFileTemp(e)}
                        />
                      </div>
                      <div>{RightsJSX}</div>
                    </div>
                  );
                })}
              </ListGroup>
            ) : null}
          </>
        ) : null}
        <AddAttachmentButtonWrapper>
          <Button
            disabled={!readyToUpload}
            onClick={() => addAttachment(currAttachment)}
          >
            Legg til vedlegg
          </Button>
        </AddAttachmentButtonWrapper>
      </Wrapper>

      <AttachmentWrapper>
        {props.listOfAttachments.length == 0 ? (
          <NoAttachmentsText>Ingen vedlegg er lagt til</NoAttachmentsText>
        ) : (
          <ListGroup>
            {props.listOfAttachments.map(e => {
              let rights = getUsersforAttachment(e.filename);
              console.log(e);
              console.log(rights);
              let RightsJSX = rights.users.map(data => {
                console.log(data);
                return (
                  <>
                    <ArtistCard artist={data} remove={removeUser(e, data)} />
                  </>
                );
              });
              return (
                <div key={e.filename}>
                  <div>
                    <img
                      width="55px"
                      height="55px"
                      src="https://cdn0.iconfinder.com/data/icons/popular-files-formats/154/tmp-512.png"
                    />
                    <FilenameText>{e.filename}</FilenameText>
                    <DelBtn src="/icons/cross.svg" onClick={removeFile(e)} />
                  </div>
                  <div>{RightsJSX}</div>
                </div>
              );
            })}
          </ListGroup>
        )}
      </AttachmentWrapper>
    </>
  );
};

export default AttachmentForm;
