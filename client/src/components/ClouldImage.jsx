import { cld } from '../../lib/cloudinary'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { upscale } from "@cloudinary/url-gen/actions/effect";
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

function Img({ imagePublicId, className }){
  const img = cld
    .image(imagePublicId)
    .format("auto")
    .quality("auto")
    .effect(upscale())
    .resize(auto().gravity(autoGravity()))
    
  return <AdvancedImage cldImg={img} className={className} />
}

export default Img
