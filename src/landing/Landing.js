import Signin from '../signin/Signin' 
import ProductImage from '../assets/images/kipu-product-update.jpeg'

function Landing() {
    return (
      <div class="tw-py-32 tw-mx-12 tw-flex tw-space-between tw-divide-x">
        <Signin/>
        <div class="tw-px-10 tw-w-1/2">
          <a href="https://www.kipuhealth.com">
            <img class="tw-mx-auto" src={ProductImage} />
          </a>
        </div>
      </div>
    );
}

export default Landing;