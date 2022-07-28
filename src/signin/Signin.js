import UserSignin from '../authenticator/UserSignin'
import LoginLogo from '../assets/images/login-logo.jpeg'

function Signin() {
  return (
    <div class="tw-px-10 tw-w-1/2">
      <img src={LoginLogo} class="tw-w-1/2 tw-mx-auto"/>
      <div class="tw-py-6">
        <h1>Staff Sign In Here and Accept Terms of Service</h1>
      </div>
      <UserSignin />
      <div class="tw-w-2/3 tw-mx-auto tw-py-6">
        <p class="tw-text-justify">
          By clicking "Sign In Now and Accept our Terms of Service," you indicate that you have read and agree to be bound to the latest Kipu Systems Terms of Service.
        </p>
      </div>
      <div class="tw-w-2/3 tw-mx-auto">
        <div class="tw-py-2">
          <ul class="tw-space-x-6">
            <li class="tw-inline-block">
              <a class="tw-text-sm tw-text-k-true-blue" href="https://kipuhealth.com/terms-of-service/">Terms of Service</a>
            </li>
            <li class="tw-inline-block">
              <a class="tw-text-sm tw-text-k-true-blue" href="https://www.kipu.health/contact-kipu-health/">Customer Support</a>
            </li>
            <li class="tw-inline-block">
              <a class="tw-text-sm tw-text-k-true-blue" href="https://www.kipu.health/kipu-emr-software/">69% Growth Study</a>
            </li>
          </ul>
        </div>
        <div>
          <ul class="tw-space-x-6">
            <li class="tw-inline-block">
              <a class="tw-text-sm tw-text-k-true-blue" href="https://testing-mat.kipuworks.com/users/password/new">Forgot Password?</a>
            </li>
            <li class="tw-inline-block">
              <a class="tw-text-sm tw-text-k-true-blue" href="https://kipuhealth.com/emr-training-calendar/">Training Calendar</a>
            </li>
            <li class="tw-inline-block">
              <a class="tw-text-sm tw-text-k-true-blue" href="https://kipuhealth.com/kipu-billing-rcm-software/">Gold Certified Billers</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Signin;