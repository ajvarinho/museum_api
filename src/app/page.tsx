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
        <div className="welcome-card flex justify-center">
          <p className="welcome-text">
            Welcome to <a href="https://www.metmuseum.org/" target="_blank">Metropolitan Museum</a>&apos;s<br></br>
            open access API page. <br></br> 
            Here you can explore the works from Met, add images of works to your collection and edit them.
          </p>
        </div>
        {/* <Loading isLoading={loading}></Loading> */}
        <ImageGrid objectIds={objectIds}></ImageGrid>
      </main>
    </div>
  );
}
