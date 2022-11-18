import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import ImageSrollbar from '../../components/ImageScrollbar';
import { baseUrl, fetchApi } from '../../utils/fetchApi';
import HTMLReactParser from "html-react-parser";


const PropertyDetails = ({ propertyDetails: { price, rentFrequency, rooms, title, baths, area, agency, isVerified, description, type, purpose, furnishingStatus, amenities, photos }}) => (
    
    <Box maxWidth='1000px' m='auto' p='4'>
         {photos && <ImageSrollbar data={photos} />}
         <Box w='full' p='6'>
         <Flex paddingTop='2' alignItems='center' justifyContent='space-between'>
             <Flex alignItems='center'>
                 <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified/> }</Box>
                 <Text fontWeight='bold' fontSize='lg'>AED {millify(price)} {rentFrequency &&`/${rentFrequency}`}</Text>
               </Flex>
               <Box>
                  <Avatar size='sm' src={agency?.logo?.url}/>
               </Box>
                </Flex>
                <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
                    {rooms} <FaBed /> | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill />
                </Flex>
                <Box marginTop='2'>
                <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{title}</Text>
                <Text lineHeight='2' color='gray.600'>{HTMLReactParser(description)}</Text>
                </Box>
                <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
                    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                        <Text>TYPE</Text>
                        <Text fontWeight='bold'>{type}</Text>
                    </Flex>
                    <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                        <Text>PURPOSE</Text>
                        <Text fontWeight='bold'>{purpose}</Text>
                    </Flex>
                    {furnishingStatus && (
                         <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
                         <Text>FURNISHING STATUS</Text>
                         <Text fontWeight='bold'>{furnishingStatus}</Text>
                     </Flex>
                    )}
                </Flex>
                {amenities && <Text fontSize='2xl' fontWeight='black' marginTop='5'>Amenities</Text>}
                <Flex flexWrap='wrap'>
                    {amenities.map((item) => (
                        item.amenities.map((amenity) => (
                            <Text 
                            color='blue.300' 
                            fontSize='l' 
                            p='2'
                            bg='gray.100' 
                            m='1' 
                            borderRadius='5'
                            key={amenity.text}>{amenity.text}
                            
                            </Text>
                        ))
                    ))}
                </Flex>
            </Box>
         </Box>

    );

export default PropertyDetails;

export async function getServerSideProps({params: { id }}) {
    const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)

    return {
        props: {
            propertyDetails: data
        }
    }
}
 
