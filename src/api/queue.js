import request from "@/utils/request";

export function clearQueue(params) {
  return request({
    url: `/clearQueue`,
    method: "GET",
    params,
  });
}