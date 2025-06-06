import React from 'react';
import './Registry.css';

export default function Registry() {
  // Zelle and other items as before…
  const zellePayee = '5169985622';
  const zelleLink = `zelle://send?recipient=${encodeURIComponent(zellePayee)}`;
  const amazonWishListUrl = 'https://www.amazon.com/wedding/share/defund-the-hoa'

  const otherItems = [
    {
      name: 'BUFFALO EXTRA REEL POWER VIDEO SLOT MACHINE',
      link: 'https://www.gamblersoasisusa.com/aristocrat-buffalo-extra-reel-power-video-slot-machine.aspx',
      price: '$1,795.00',
      image: 'https://www.gamblersoasisusa.com/resize/Shared/Images/Product/ARISTOCRAT-BUFFALO-MKVI-VIDEO-SLOT-MACHINE/Buffalo-1.jpg?bw=1000&w=1000&bh=2000&h=2000',
    },
    {
      name: 'Elkay EZSTL8WSLK His And Hers Bottle Filling Station, Medium, Light Gray Granite',
      link: 'https://www.amazon.com/Elkay-EZSTL8WSLK-Versatile-Bi-Level-Non-Filtered/dp/B005XNESMA/?_encoding=UTF8&pd_rd_w=u3S1Y&content-id=amzn1.sym.255b3518-6e7f-495c-8611-30a58648072e%3Aamzn1.symc.a68f4ca3-28dc-4388-a2cf-24672c480d8f&pf_rd_p=255b3518-6e7f-495c-8611-30a58648072e&pf_rd_r=VG0RPP2D31RGQ19CGYE9&pd_rd_wg=srBk4&pd_rd_r=d774e7c4-305f-45d3-b3cd-1347f626773a&ref_=pd_hp_d_atf_ci_mcx_mr_ca_hp_atf_d&th=1',
      price: '$1,979.99',
      image: 'https://m.media-amazon.com/images/I/414O4eLxhLL._AC_SL1000_.jpg',
    },
    
  ];

  return (
    <div className="registry-container">
      <h2 className="registry-heading">Our Registry</h2>
      <section className="registry-section">
        <div className="registry-grid">
          {otherItems.map((item, idx) => (
            <div key={idx} className="registry-card">
              {item.image && (
                <div className="registry-card-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="registry-card-image"
                  />
                </div>
              )}
              <div className="registry-card-content">
                <h4 className="registry-card-title">{item.name}</h4>
                <h4 className='registry-card-title'>{item.price}</h4>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="registry-card-link"
                >
                  View Item
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amazon Wishlist Section */}
      <section className="registry-section">
        <h3 className="registry-subheading">Amazon Wishlist</h3>
        <p>If you’d like to pick something from our Amazon registry, click below:</p>
        <a
          href={amazonWishListUrl}
          className="registry-button"
        >
          View Amazon Wishlist
        </a>
      </section>

      {/* —————  Zelle Section  ————— */}
      <section className="registry-section">
        <h3 className="registry-subheading">Cash Gift (Zelle)</h3>
        <p>
          For a cash gift, you can send via Zelle to <strong>{zellePayee}</strong>.
          Click the button below:
        </p>
        <a
          href={zelleLink}
          target="_blank"
          rel="noopener noreferrer"
          className="registry-button"
        >
          Button doesn't work yet, dont click this
        </a>
      </section>

      {/* —————  Other Gift Items Section  ————— */}
      
    </div>
  );
}
