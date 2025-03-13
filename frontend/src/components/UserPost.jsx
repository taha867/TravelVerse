import { Avatar, Box, Flex, Image, Menu, MenuButton, MenuItem, MenuList, Portal, Text, useToast } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { BsThreeDots } from "react-icons/bs"
import Actions from "./Actions"
import { useState } from "react"

const UserPost = ({ likes, replies, postImg, postTitle }) => {
  const [liked, setLiked] = useState(false);
  const toast = useToast();

  const copyURL = () => {
    const currentURL = window.location.href;
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
        title: 'Link Copied.',
        description: "Profile Link Copied.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    });
  };

  return (
    <Flex gap={3} mb={4} py={5}>
      <Flex flexDirection={"column"} alignItems={"center"}>
        <Avatar size='md' name='Mark Zuckerberg' src='/zuck-avatar.png'></Avatar>
        <Box w="1px" h={"full"} bg="gray.light" my={2}></Box>
        <Box position={"relative"} w={"full"}>
          <Avatar
            size="xs"
            name="john doe"
            src="https://bit.ly/dan-abramov"
            position={"absolute"}
            top={"0px"}
            left="15px"
            padding={"2px"}
          />
          <Avatar
            size="xs"
            name="john doe"
            src="https://bit.ly/sage-adebayo"
            position={"absolute"}
            bottom={"0px"}
            right="-5px"
            padding={"2px"}
          />
          <Avatar
            size="xs"
            name="john doe"
            src="https://bit.ly/prosper-baba"
            position={"absolute"}
            bottom={"0px"}
            left="4px"
            padding={"2px"}
          />
        </Box>
      </Flex>
      <Flex flex={1} flexDirection={"column"} gap={2}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Flex w={"full"} alignItems={"center"}>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              <Link to={"/markzuckerberg/post/1"}>markzuckerberg</Link>
            </Text>
            <Image src="/verified.png" w={4} h={4} ml={1}></Image>
          </Flex>
          <Flex gap={4} alignItems={"center"}>
            <Text fontStyle={"sm"} color={"gray.light"}>id</Text>
            <Menu>
              <MenuButton >
                <BsThreeDots cursor={"pointer"} />
              </MenuButton>
              <Portal>
                <MenuList bg={"gray.dark"}>
                  <MenuItem bg={"gray.dark"} color={"white"} onClick={copyURL}>
                    Copy Link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Flex>
        </Flex>
        <Link to={"/markzuckerberg/post/1"}>
          <Text fontSize={"sm"}>{postTitle}</Text>
          {postImg && (
            <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"}>
              <Image src={postImg} w={"full"} />
            </Box>
          )}
        </Link>
        <Flex gap={3} my={1}>
          <Actions liked={liked} setLiked={setLiked} />
        </Flex>
        <Flex gap={2} alignItems={"center"}>
          <Text color={"gray.light"} fontSize="sm">{replies} replies</Text>
          <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
          <Text color={"gray.light"} fontSize="sm">{likes} likes</Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserPost;
