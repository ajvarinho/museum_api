'use client'
import { useEffect, useState, useCallback } from "react";
import { getData } from "../services/fetch";
//import { ImageData } from "../../services/interfaces";
import Header from '../components/Header/Header';
import ImageGrid from '../components/ImageGrid/ImageGrid';

export default function Home() {

   const [objectIds, setObjectIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchIds = async () => {
      setLoading(true);
      const ids = await getData();
      setObjectIds(ids);
      setLoading(false);
    };
    fetchIds();
  }, []);

  return (
    <div className="">
      <Header isLoading={loading}></Header>
      <main className="">
        <ImageGrid objectIds={objectIds}></ImageGrid>
      </main>
    </div>
  );
}
