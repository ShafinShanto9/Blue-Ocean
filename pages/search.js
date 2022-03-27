import { Box, Flex, Icon, Text } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { BsFilter } from 'react-icons/bs'
import SearchFilters from '../components/SearchFilters'
import Property from '../components/Property'
import noresult from '../assests/images/noresult.svg'
import Image from 'next/image'
import query from 'express/lib/middleware/query'
import { baseUrl, fetchApi } from '../utils/fetchApi'


const search = ({properties}) => {
    const [searchFilters, setSerchFilters] = useState(false)
    const router = useRouter()

  return (
      <Box>
          <Flex
              cursor="pointer"
              bg="gray.100"
              borderBottom="1px"
              borderColor="blue.100"
              p="2"
              fontWeight="bold"
              fontSize="lg"
              justifyContent="center"
              alignItems="center"
              onClick={()=>setSerchFilters((prevFilters)=>!prevFilters)}

          >
              <Text>Serach Property By Filtering</Text>
              <Icon paddingLeft="2" w="7" as={BsFilter}/>
          </Flex>  

         
          {searchFilters && <SearchFilters />}
          <Text fontSize="2xl" p="4" fontWeight="bold">
            properties {router.query.purpose}
          </Text>

          {/* Display Filtering Property */}
          <Flex flexWrap="wrap" justifyContent="center" alignItems="center" marginTop={10}>
              {properties.map((property) => <Property property={property} key={ property.id}/>)}
          </Flex>
          {
              properties.length === 0 && (
                  <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5"  >
                      <Image alt="no result" src={noresult} />
                      <Text fontSize="2xl" marginTop="3">No Result Found 😥</Text>
                  </Flex>
              )
          }
    </Box>
  )
}

export default search

// Get Filtering api data

export async function getServerSideProps({query}) {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=${locationExternalIDs}&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);


  return {
    props: {
      properties : data?.hits
    },
  };
}