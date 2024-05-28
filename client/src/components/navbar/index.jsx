export default function NavBar(){
    return <>
      
  <header class="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <nav class="main-nav">
            
            <a href="index.html" class="logo">
              <img src="assets/images/logo.png" alt="Chain App Dev"/>
            </a>
           
            <ul class="nav">
              <li class="scroll-to-section"><a href="#top" class="active">Home</a></li>
              <li class="scroll-to-section"><a href="#services">Services</a></li>
              <li class="scroll-to-section"><a href="#about">About</a></li>
              <li class="scroll-to-section"><a href="#pricing">Pricing</a></li>
              <li class="scroll-to-section"><a href="#newsletter">Newsletter</a></li>
              <li><div class="gradient-button"><a id="modal_trigger" href="#modal"><i class="fa fa-sign-in-alt"></i> Sign In Now</a></div></li> 
            </ul>        
            <a class='menu-trigger'>
                <span>Menu</span>
            </a>
            
          </nav>
        </div>
      </div>
    </div>
  </header>
  
    </>
}