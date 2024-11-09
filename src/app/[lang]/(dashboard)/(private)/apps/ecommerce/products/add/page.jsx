// MUI Imports
import Grid from '@mui/material/Grid'

// Component Imports
import ProductAddHeader from '@views/apps/ecommerce/products/add/ProductAddHeader'
import ProductInformation from '@views/apps/ecommerce/products/add/ProductInformation'
import ProductImage from '@views/apps/ecommerce/products/add/ProductImage'
import ProductVariants from '@views/apps/ecommerce/products/add/ProductVariants'
import ProductInventory from '@views/apps/ecommerce/products/add/ProductInventory'
import ProductPricing from '@views/apps/ecommerce/products/add/ProductPricing'
import ProductOrganize from '@views/apps/ecommerce/products/add/ProductOrganize'

const submissionFormAdd = () => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <ProductAddHeader />
      </Grid>
      <Grid item xs={12} md={12}>
        <Grid container spacing={6}>
          <Grid item xs={12}>
            <ProductInformation />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductImage />
          </Grid>
          <Grid item xs={12} md={6}>
            <ProductOrganize />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default submissionFormAdd
