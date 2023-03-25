import React, {
  ChangeEvent,
  FormEvent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { LoadingButton } from "@mui/lab";
import { ImageListItem } from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { get, isEmpty, isNil } from "lodash";
import axios from "axios";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import { iconColor } from "../../../../common/constants/icon-color.constant";
import { StoreContext } from "../../../../stores/store.context";
import { Image } from "../../../../stores/types/image.type";

export const NewImage: React.FC<{
  portfolioId: number;
  busyState: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
  imagesState: [Image[], React.Dispatch<React.SetStateAction<Image[]>>];
}> = ({
  portfolioId,
  busyState: [busy, setBusy],
  imagesState: [images, setImages],
}): JSX.Element => {
  const [url, setUrl] = useState<string>("");
  const [urlError, setUrlError] = useState<boolean>(false);
  const [urlBusy, setUrlBusy] = useState<boolean>(false);
  const urlRef = useRef<HTMLInputElement>(null);

  const [description, setDescription] = useState<string>("");
  const [descriptionError, setDescriptionError] = useState<boolean>(false);
  const descriptionRef = useRef<HTMLInputElement>(null);

  const { imageService } = useContext(StoreContext);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isEmpty(url) && !urlError) {
      setBusy(true);
      await imageService
        .createImage(portfolioId, { url, description })
        .then((newImage) => {
          setImages([newImage, ...images]);
        })
        .finally(() => {
          setBusy(false);
          return;
        });
    }
  };

  const updateUrl = async (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    const fieldValue = event.target.value;

    if (isNil(fieldValue) || isEmpty(fieldValue)) {
      setUrl("");
      setUrlBusy(false);
      setUrlError(false);
      return;
    }
    if (
      /(https?:\/\/)?([\da-z\.-]+)\.([a-z]{2,6})([\/\w\.-]*)*\/?/g.test(
        fieldValue
      )
    ) {
      setUrlBusy(true);
      await axios
        .head(fieldValue)
        .then((response) => {
          const contentType = get(response, 'headers["content-type"]', "");

          if (contentType.includes("png") || contentType.includes("jpeg")) {
            setUrlError(false);
            setUrl(fieldValue);
          }
        })
        .catch(() => {
          setUrl("");
          setUrlError(true);
        })
        .finally(() => {
          setUrlBusy(false);
        });
    }
  };

  const updateDescription = async (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    event.preventDefault();
    const fieldValue = event.target.value;

    if (isNil(fieldValue) || isEmpty(fieldValue)) {
      setDescription("");
      return;
    }

    if (fieldValue.length > 40) {
      setDescriptionError(true);
      return;
    }

    setDescription(fieldValue);
    setDescriptionError(false);
  };

  useEffect(() => {
    setUrl("");
    // @ts-expect-error because we have initial value here
    urlRef.current.value = url;
    setUrlError(false);
    setUrlBusy(false);

    setDescription("");
    //@ts-expect-error because we have initial value here
    descriptionRef.current.value = description;
    setDescriptionError(false);
  }, [portfolioId]);

  return (
    <>
      <Box
        component="form"
        onSubmit={(event: FormEvent<HTMLFormElement>) => handleSubmit(event)}
        sx={{ mt: 1, p: 3 }}
        boxShadow={3}
      >
        <Typography variant="h5" gutterBottom>
          Upload new Image
        </Typography>
        <TextField
          margin="dense"
          fullWidth
          id="imageUrl"
          type="url"
          inputRef={urlRef}
          name="imageUrl"
          label="url"
          disabled={urlBusy || busy}
          error={urlError}
          onChange={updateUrl}
          helperText={urlError && "Cannot show image by this url"}
        />
        <TextField
          margin="dense"
          fullWidth
          id="imageDescription"
          type="text"
          name="imageDescription"
          label="Description"
          inputRef={descriptionRef}
          error={descriptionError}
          helperText={
            descriptionError &&
            "Description length must be less than or equal 50 symbols"
          }
          onChange={updateDescription}
        />
        <LoadingButton
          type="submit"
          fullWidth
          loading={false}
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disabled={!url || urlBusy || urlError || descriptionError || busy}
        >
          upload new image
        </LoadingButton>
        {url && !urlError && (
          <Box component="div" sx={{ mt: 5 }}>
            <Typography variant="h6" gutterBottom>
              Image preview
            </Typography>
            <ImageListItem key={2}>
              <img src={url} alt="none" loading="lazy" />
              <ImageListItemBar
                title={description}
                actionIcon={
                  <span>
                    <IconButton sx={{ color: iconColor }}>
                      <DeleteIcon />
                    </IconButton>
                    <IconButton sx={{ color: iconColor }}>
                      <InfoIcon />
                    </IconButton>
                  </span>
                }
              />
            </ImageListItem>
          </Box>
        )}
      </Box>
    </>
  );
};
