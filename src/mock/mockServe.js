import Mock from "mockjs";
import floor from "@/mock/floor.json";
import banner from "@/mock/banner.json";
import address from "@/mock/address.json";
Mock.mock("/mock/routationChart", { code: 200, data: banner });
Mock.mock("/mock/classIntroduction", { code: 200, data: floor });
Mock.mock("/mock/address", { code: 200, data: address });
