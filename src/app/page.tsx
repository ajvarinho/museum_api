'use client'
import { useEffect, useState, useCallback } from "react";
import { getData } from "../services/fetch";
//import { ImageData } from "../../services/interfaces";
import Nav from '../components/Nav/Nav';
import NavBtn from '@/components/Buttons/NavBtn';
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
      <main className="main">
        <NavBtn></NavBtn>
        {/* <Loading isLoading={loading}></Loading> */}
        <ImageGrid objectIds={objectIds}></ImageGrid>
      </main>
      <Nav isLoading={loading}></Nav>
    </div>
  );
}
