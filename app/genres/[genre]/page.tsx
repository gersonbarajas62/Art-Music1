"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import dynamic from "next/dynamic";
import { useParams } from "next/navigation";
import GenrePage from "../../../Components/GenrePage";

const Slider = dynamic(() => import("react-slick"), { ssr: false });

export default function GenreDynamicPage() {
  const params = useParams();
  const genre = Array.isArray(params.genre) ? params.genre[0] : params.genre;
  return <GenrePage genre={genre ?? ""} />;
}