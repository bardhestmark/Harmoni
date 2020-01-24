/**
 * Info form with inputs that gives the basic info for an event.
 *
 * Inputs in this form:
 * - Title
 * - Picture (optional)
 * - Category
 * - Location
 * - Date and time from
 * - Date and time to
 */

import React, { useState } from "react";
import styled from "styled-components";
import DateTimePicker from "./dateTimePicker";
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import ImageUpload from "../../Upload/imageUpload";
import Map from "../../Event/map";
import { geoService } from "../../../services/GeoService";
import { compareDates } from "../../utils";

const Title = styled.h2`
  font-size: 48px;
  font-weight: 500;
  text-align: center;
  margin-bottom: 40px;
`;

const UnderTitle = styled.h5`
  margin: 25px 0 15px 0;
`;

const MiniTitle = styled.h6`
  margin: 15px 0 10px 0;
`;

const inputStyle = {
  width: "100%",
  marginBottom: "25px"
};

const inputStyleLocationFound = Object.assign({}, inputStyle, {
  border: "1px #2ecc71 solid",
  borderRadius: "5px"
});

const WarningText = styled.p`
  margin: 30px 0;
  font-size: 16px;
  font-weight: 400;
  color: #d55951;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 200px;
`;

interface IProps {
  infoSubmit: boolean;
  infoData: any;
  setInfoData: Function;
  isInfoDataEmpty: Function;
}

const BasicInfoForm = (props: IProps) => {
  const [coords, setCoords] = useState([-1000, -1000]);
  const [fetchingCoords, setFetchingCoords] = useState(false);

  // Category types and translated to norwegian
  const types_translated = [
    "Konsert",
    "Festival",
    "Teater",
    "Standup",
    "Show",
    "Annet"
  ];
  const types = ["concert", "festival", "theatre", "standup", "show", "other"];

  // Inital geoLocaton before it is set
  let initialCoords = [-1000, -1000];

  // Category items
  let menuItems: JSX.Element[] = [];

  // Add menu items to dropdown list
  for (let i = 0; i < types.length; i++) {
    menuItems.push(
      <MenuItem key={i} value={types[i]}>
        {types_translated[i]}
      </MenuItem>
    );
  }

  // Get coordinates based on location (string) in input
  const fetchCoords = (address: string) => {
    if (address.length > 0) {
      setFetchingCoords(true);
      geoService.getLatAndLndOfAddress(address).then(data => {
        if (data) {
          setCoords(data);
        }
        setFetchingCoords(false);
      });
    } else {
      setCoords(initialCoords);
    }
  };

  // Compare two dates to check which is larger/smaller
  // const compareDates = (date1, date2) => {
  //   let fromDate = new Date(date1);
  //   let toDate = new Date(date2);
  //   return fromDate < toDate;
  // };

  return (
    <>
      {/* Name input */}
      <Title>Info</Title>
      <UnderTitle>Navn på arrangement*</UnderTitle>
      <TextField
        style={inputStyle}
        variant="outlined"
        placeholder="Navn"
        error={props.infoSubmit && props.infoData.name === ""}
        helperText={
          props.infoSubmit && props.infoData.name === ""
            ? "Navn er påkrevd"
            : "Maks 45 karakterer"
        }
        value={props.infoData.name}
        onChange={e =>
          e.target.value.length <= 45
            ? props.setInfoData({ ...props.infoData, name: e.target.value })
            : null
        }
      />

      {/* Picture input and image preview  */}
      <UnderTitle>Bilde</UnderTitle>
      <ImageUpload
        picture={
          props.infoData.imgData &&
          new Buffer(props.infoData.imgData).toString("ascii")
        }
        setImgData={data =>
          props.setInfoData({ ...props.infoData, imgData: data })
        }
      />

      {/* Category dropdown selector */}
      <UnderTitle>Kategori*</UnderTitle>
      <FormControl
        variant="outlined"
        style={{ width: "160px" }}
        error={props.infoSubmit && props.infoData.category === ""}
      >
        <InputLabel id="select-filled-label">Kategori*</InputLabel>
        <Select
          labelId="select-outlined-label"
          value={props.infoData.category}
          labelWidth={300}
          style={inputStyle}
          onChange={(e: any) =>
            e.target.value.length <= 45
              ? props.setInfoData({
                  ...props.infoData,
                  category: e.target.value
                })
              : null
          }
        >
          {menuItems}
        </Select>
        {props.infoSubmit && props.infoData.category === "" && (
          <FormHelperText>Kategori er påkrevd</FormHelperText>
        )}
      </FormControl>

      {/* Location Input and map */}
      <UnderTitle>Lokasjon*</UnderTitle>
      <TextField
        style={
          coords.length > 0 && coords[0] !== -1000 && !fetchingCoords
            ? inputStyleLocationFound
            : inputStyle
        }
        variant="outlined"
        placeholder="Lokasjon (Maks 45 karakterer)"
        value={props.infoData.location}
        error={
          (coords.length === 0 && !fetchingCoords) ||
          (props.infoSubmit && props.infoData.location === "")
        }
        helperText={
          props.infoSubmit && props.infoData.location === ""
            ? "Lokasjon er påkrevd"
            : fetchingCoords
            ? "Vennligst vent..."
            : coords.length > 0
            ? ""
            : "Lokasjonen ble ikke funnet"
        }
        onChange={e =>
          e.target.value.length <= 45
            ? props.setInfoData({ ...props.infoData, location: e.target.value })
            : null
        }
        onBlur={e => fetchCoords(e.target.value)}
      />
      {coords.length > 0 && coords[1] !== -1000 && (
        <MapWrapper>
          <Map coords={{ lat: coords[0], lng: coords[1] }} zoom={12} />
        </MapWrapper>
      )}

      {/* Date and time inputs */}
      <UnderTitle>Dato og tid*</UnderTitle>
      <MiniTitle>Fra</MiniTitle>
      <DateTimePicker
        minDate={new Date()}
        disablePast={true}
        style={inputStyle}
        selectedDate={props.infoData.dateFrom}
        setSelectedDate={date =>
          props.setInfoData({
            ...props.infoData,
            dateFrom: date
          })
        }
        error={props.infoSubmit && props.infoData.dateFrom === null}
        helperText={
          props.infoSubmit && props.infoData.dateFrom === null
            ? "Dato og tid fra er påkrevd"
            : ""
        }
      />
      <MiniTitle>Til</MiniTitle>
      <DateTimePicker
        fullWidth
        style={inputStyle}
        selectedDate={props.infoData.dateTo}
        setSelectedDate={date =>
          props.setInfoData({
            ...props.infoData,
            dateTo: date
          })
        }
        error={props.infoSubmit && props.infoData.dateTo === null}
        helperText={
          props.infoSubmit && props.infoData.dateTo === null
            ? "Dato og tid til er påkrevd"
            : ""
        }
      />

      {/* Show warning message if any required input is empty/not selected  */}
      {props.infoSubmit && props.isInfoDataEmpty() && (
        <WarningText>
          Noen felter som er påkrevd er tomme, vennligst fyll disse ut før du
          fortsetter.
        </WarningText>
      )}

      {/* Check that from date is not after to date, which would be invalid */}
      {props.infoData.dateFrom !== null &&
        props.infoData.dateTo !== null &&
        !compareDates(props.infoData.dateFrom, props.infoData.dateTo) && (
          <WarningText>Fra dato kan ikke være etter til dato</WarningText>
        )}

      {/* Check that the date is not in the past */}
      {props.infoData.dateFrom !== null &&
        props.infoData.dateTo !== null &&
        (!compareDates(new Date(), props.infoData.dateFrom) ||
          !compareDates(new Date(), props.infoData.dateTo)) && (
          <WarningText>Datoen du har valgt er i fortiden</WarningText>
        )}
    </>
  );
};

export default BasicInfoForm;
