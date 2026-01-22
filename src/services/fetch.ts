import { imgResponse, SearchAPIResponse, ImageData} from './interfaces';
import fallbackImg from "../../public/2.jpg";

const API_URL =
  'https://collectionapi.metmuseum.org/public/collection/v1/search?hasImages=true&q="painting"';
const FALLBACK_IMG = fallbackImg.src;


  /**
   * Function to fetch all initial IDs from API rute
   * using SearchAPIResponse interface
   * returns number[]
   */
  export const getData = async (): Promise<number[]> => {
    try {
      const res = await fetch(API_URL);
      const data: SearchAPIResponse = await res.json();
      return data.objectIDs || [];
    } catch (err) {
      console.error("Error fetching data:", err);
      return [];
    }
  };


/**
   * Helper function to get randon unique IDs from fetched array
   * @param arr 
   * @param count 
   * @returns array
   */
  export const getRandomUnique = (arr: number[], count: number): number[] => {
    const result: number[] = [];
    const used = new Set<number>();

    while (result.length < count && result.length < arr.length) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      const num = arr[randomIndex];
      if (!used.has(num)) {
        used.add(num);
        result.push(num);
      }
    }
    return result;
  };

  /**
   * Function to fetch image data using specific ID
   * @param id 
   * @returns image
   */
  export const getImageData = async (id: number): Promise<ImageData | null> => {
    try {
      const res = await fetch(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      const data: imgResponse = await res.json();

      // helper to check if data.primaryImage is empty string
      const hasValidImage =
      data.primaryImageSmall && data.primaryImageSmall.trim() !== "";

      const titleCheck = data.title && data.title.length > 50 ? data.title.substring(0,20) + '...' : data.title;
      //
      const title = data.title && data.title.length > 50 ? titleCheck : data.title;

      console.log(title)

      const image: ImageData = {
        id: data.objectID,
        title: titleCheck || "Image not found",
        fullTitle: data.title || undefined,
        //@ts-ignore
        srcSmall: hasValidImage ? data.primaryImageSmall : FALLBACK_IMG,
        srcLarge: data.primaryImage || undefined,
        author: data.artistDisplayName || undefined,
        medium: data.medium || undefined,
        dimensions: data.dimensions || undefined,
        date: data.objectDate || undefined,
        department: data.department === 'European Sculpture and Decorative Arts' ? 'European sculpture' : data.department || undefined,
        favorites: false,
      };

      console.log('image in get image data', image)
      return image;
    } catch (err) {
      console.error("Error fetching image:", err);
      return null;
    }
  };



    // Use IDs to load 10 random images
  export const loadImages = async (objectIds:number[]): Promise<ImageData[]> => {

    if (objectIds.length === 0) return [];
    const randomIds = getRandomUnique(objectIds, 12);
    const results = await Promise.all(randomIds.map(getImageData));
    console.log('results from loadImages', results)
    const validImages = results.filter(
      (img): img is ImageData => img !== null
    );
    return validImages;
  };


  /**
   * 
   */

  const loadMoreImages = async (objectIds: number[]) => {
    if (objectIds.length === 0) return;
  
    try {
      const randomIds = getRandomUnique(objectIds, 10);
      const imageResults = await Promise.all(randomIds.map((id) => getImageData(id)));
  
      const validImages = imageResults.filter(
        (img): img is ImageData => img !== null
      );
  
      //setImages((prev) => [...prev, ...validImages]);
    } catch (err) {
      console.error("Error fetching next randoms:", err);
    } 
    // finally {
    //   setLoading(false);
    // }
  };

  export const toDataURL = (url: string) =>
  fetch(url)
    .then(res => res.blob())
    .then(
      blob =>
        new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        })
    );