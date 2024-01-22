import React, { useState } from "react";
import {
  Grid,
  GridItem,
  Card,
  Image,
  Stack,
  CardBody,
  CardFooter,
  Heading,
  Text,
  Button,
  Box,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";

export default function Event() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <Box>
          <Heading size="lg" margin={10} textAlign="center">
            Festival
          </Heading>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            margin={6}
            maxH="190px"
            maxW="570px"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            />
            <Stack
              justifyContent={{ base: "flex-start", sm: "space-between" }}
              flex="1"
              ml={{ base: 0, sm: 4 }}
            >
              <CardBody maxH="130px" maxW="340px">
                <Heading size="md" maxH="50px" overflow="hidden">
                  축제 제목
                </Heading>
                <Text py="2" maxH="80px" overflow="hidden">
                  미리보기 내용
                </Text>
              </CardBody>
              <CardFooter justifyContent="flex-end">
                <Button colorScheme="green" variant="link" onClick={onOpen}>
                  See more ≫
                </Button>
              </CardFooter>
            </Stack>
          </Card>
          <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>축제 제목</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  textAlign="center"
                >
                  <Image src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60" />
                  <Text>내용</Text>
                </Box>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Box>

        <Box>
          <Heading size="lg" margin={10} textAlign="center">
            News
          </Heading>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            margin={6}
            maxH="190px"
            maxW="570px"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            />
            <Stack
              justifyContent={{ base: "flex-start", sm: "space-between" }}
              flex="1"
              ml={{ base: 0, sm: 4 }}
            >
              <CardBody maxH="130px" maxW="340px">
                <Heading size="md" maxH="50px" overflow="hidden">
                  뉴스 제목
                </Heading>
                <Text py="2" maxH="80px" overflow="hidden">
                  미리보기 내용
                </Text>
              </CardBody>
              <CardFooter justifyContent="flex-end">
                <Button colorScheme="green" variant="link" onClick={onOpen}>
                  See more ≫
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </Box>

        <Box>
          <Heading size="lg" margin={10} textAlign="center">
            Tips
          </Heading>
          <Card
            direction={{ base: "column", sm: "row" }}
            overflow="hidden"
            variant="outline"
            margin={6}
            maxH="190px"
            maxW="570px"
          >
            <Image
              objectFit="cover"
              maxW={{ base: "100%", sm: "200px" }}
              src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            />
            <Stack
              justifyContent={{ base: "flex-start", sm: "space-between" }}
              flex="1"
              ml={{ base: 0, sm: 4 }}
            >
              <CardBody maxH="130px" maxW="340px">
                <Heading size="md" maxH="50px" overflow="hidden">
                  팁 제목
                </Heading>
                <Text py="2" maxH="80px" overflow="hidden">
                  미리보기 내용
                </Text>
              </CardBody>
              <CardFooter justifyContent="flex-end">
                <Button colorScheme="green" variant="link" onClick={onOpen}>
                  See more ≫
                </Button>
              </CardFooter>
            </Stack>
          </Card>
        </Box>
      </Grid>
    </>
  );
}
