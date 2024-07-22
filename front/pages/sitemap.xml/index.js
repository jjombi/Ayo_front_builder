import { SitemapBuilder, withXMLResponse } from '@functions/sitemap/sitemap';
import { customAxiosGet } from "@functions/Custom_axios/Custom_axios";
import axios from 'axios';
const sitemapList = [
  'https:ay0.site',
  'https://ay0.site/quezeshow',
  'https://ay0.site/login',
  'https://ay0.site/signup',
];

const quezeshow_url_ = await customAxiosGet({
  url : '/get_all_quezeshow',
})
const quezeshow_url = quezeshow_url_.data.map(e=>{
  console.log('asd',e);
  return 'https://ay0.site/quezeshow/'+e.roomnum
})

export const getServerSideProps = async (ctx) => {
  const fields = new SitemapBuilder().buildSitemapXml([...sitemapList,...quezeshow_url]);
  return withXMLResponse(ctx, fields);
};

export default function Sitemap() {} 
//