import React,{useRef,useEffect} from "react";

const Adfit = (props) =>{
    const adRef = useRef(false);

    useEffect(() => {
      // 로딩된 광고가 있으면, 추가 로딩 X
      if (adRef.current) {
        return;
      }
  
      const ins = document.createElement('ins');
      const script = document.createElement('script');
  
      ins.className = 'kakao_ad_area';
      ins.style.display = 'none;';
  
      script.async = true;
      script.type = 'text/javascript';
      script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
      ins.setAttribute('data-ad-unit',`${props.unit}`);

      document.querySelector('.aside__kakaoAdFit').appendChild(ins);
      document.querySelector('.aside__kakaoAdFit').appendChild(script);
      
      // 광고 로딩 여부 상태 변경
      adRef.current = true;
    }, []);
    return(
        <aside className="aside__kakaoAdFit"></aside>
    )
}
export default Adfit;