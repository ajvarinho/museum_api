'use client'
import { useEffect, useState, useCallback } from "react";
import { getData } from "../services/fetch";
//import { ImageData } from "../../services/interfaces";
import Nav from '../components/Nav/Nav';
import Button from '@/components/Buttons/Button';
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

  const openNav = ()=> {
    console.log('cloicked')
  }

  return (
    <div className="">
      <SVGFilters></SVGFilters>
      <main className="main">
        <Button onClick={openNav}>=alo=</Button>
        {/* <Loading isLoading={loading}></Loading> */}
        <ImageGrid objectIds={objectIds}></ImageGrid>
      </main>
      <Nav isLoading={loading}></Nav>
    </div>
  );
}
