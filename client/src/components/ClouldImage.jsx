import { cld } from '../../lib/cloudinary'
import { auto } from '@cloudinary/url-gen/actions/resize';
import { autoGravity } from '@cloudinary/url-gen/qualifiers/gravity';
import { AdvancedImage } from '@cloudinary/react';

const Img = ({publicId, className}) => {
  const img = cld
    .image(publicId)
    .format("auto")
    .quality("auto")
    .resize(auto().gravity(autoGravity()))

  return <AdvancedImage cldImg={img} className={className}/>
};

export default Img;
