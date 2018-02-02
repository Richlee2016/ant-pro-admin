import { isUrl } from "../utils/utils";

const menuData = [
  {
    name: "电影",
    icon: "desktop",
    path: "movie",
    children: [
      {
        name: "影片",
        path: "home",
        icon:"link"
      },
      {
        name: "推荐",
        path: "hot",
        icon:"heart-o",
      }
    ]
  }
];

function formatter(data, parentPath = "", parentAuthority) {
  return data.map(item => {
    let { path } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
      authority: item.authority || parentAuthority
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority
      );
    }
    return result;
  });
}

export const getMenuData = () => formatter(menuData);
