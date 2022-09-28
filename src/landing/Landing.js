import Signin from '../signin/Signin' 
import Image1 from '../assets/images/zone3-bg1.jpg'
import Image2 from '../assets/images/zone3-bg2.jpg'
import Image3 from '../assets/images/zone3-bg3.jpg'

function randomImage() {
  var images = [Image1, Image2, Image3]
  return images[Math.floor(Math.random()*images.length)];
}

function getCookie(cookie){
  document.cookie.split('; ').find((row) => row.startsWith(cookie))
}

function imageBlocked(){
  var img = document.getElementById('zone-image')

  if (!img) return;
  
  var rand = Math.floor(Math.random() * Math.floor(3));
  return `zone3-bg-image-${rand}`;
}

function Landing() {

  return (
    <div className="tw-py-16 lg:tw-py-32 tw-mx-2 lg:tw-mx-12 tw-flex lg:tw-space-between tw-divide-x">
      <Signin/>
      <div className="tw-px-10 tw-w-1/2 tw-hidden lg:tw-block">
        <ins className={`zone-3 ${imageBlocked() || ''}`} id="zone3" data-revive-zoneid="1" data-revive-id="1dfaae5996a6ccb7c316ad36d44cc0f2"  data-revive-kipuversion={process.env.REACT_APP_KIPU_VERSION} data-revive-kipuroles={getCookie('kipu_user_roles')}>
          <a className="tw-mx-auto" href="//kipu.health">
            <img alt="" className="tw-mx-auto zone-image" src={randomImage()} />
          </a>
        </ins>
      </div>
    </div>
  );
}

export default Landing;