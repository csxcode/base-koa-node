import {inject, injectable} from 'inversify'
import {TYPES} from '../../../adapters/types/inversify.types'
import {PaginationResponseDto, PaginationSearchResult} from '../../../domain/base/dtos/pagination.dto'
import {ProductEntity} from '../../../domain/product'
import {SearchProductItemResponseDto, SearchProductRequestDto} from '../../../domain/product/dtos/search-product.dto'
import { Helper } from '../../shared/helpers'
import {IProductRepository} from '../contracts/product.repository'

@injectable()
export class SearchProductUseCase {

  private params!: SearchProductRequestDto

  constructor(
    @inject(TYPES.ProductRepository)
    private readonly productRepository: IProductRepository,
  ) {}

  async execute(params: SearchProductRequestDto): Promise<PaginationResponseDto<SearchProductItemResponseDto>> {
    
    this.params = Helper.setPaginateLimitsByDefault(params);

    const data: PaginationSearchResult<ProductEntity> = await this.productRepository.search(this.params);        
    const items = this.getItems(data.items);    

    return new PaginationResponseDto<SearchProductItemResponseDto>(items, data.page, data.limit, data.total);        
  }

  private getItems(items: ProductEntity[]): SearchProductItemResponseDto[] {
    return items.map((item: ProductEntity) => {                
            
      let dto: SearchProductItemResponseDto = new SearchProductItemResponseDto();      
      dto.id = item.id;
      dto.brand = item.brand;
      dto.description = item.description;            
      return dto;      
    })
  }  
}
