'use client'
import { useEffect, useState, useCallback } from "react";

import { getData } from "../services/fetch";
//import { ImageData } from "../../services/interfaces";
import Header from '../components/Header/Header';
import ImageGrid from '../components/ImageGrid/ImageGrid';
import SVGFilters from '../components/FilterTest/SVGFilters';
import Loading from '../components/Loading/Loading';

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
      <SVGFilters></SVGFilters>
      <Header isLoading={loading}></Header>
      <main className="main">
        <h2> whelocme to metropolitan</h2>
        {/* <Loading isLoading={loading}></Loading> */}
        <ImageGrid objectIds={objectIds}></ImageGrid>
      </main>
    </div>
  );
}
