import { Pagination } from "../../domain/shared/constants";

export class Helper {
  static setPaginateLimitsByDefault(params: any) {
    let {page, limit} = params
    page = page ? parseInt(page) : 1;
    limit = limit ? parseInt(limit) : Pagination.PAGE_LIMIT;

    if(limit > Pagination.PAGE_LIMIT)
      limit = Pagination.PAGE_LIMIT;

    params.page = page;
    params.limit = limit;
    
    return params;
  }     
}
