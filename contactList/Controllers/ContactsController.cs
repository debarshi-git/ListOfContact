using contactList.Data;
using contactList.Models;
using contactList.Models.Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace contactList.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    //we are using constructor injection..
    public class ContactsController : ControllerBase
    {
        private readonly ContactlyDbContext dbContext;

        //injecting an instance of db context class..
        public ContactsController(ContactlyDbContext dbContext)
        {
            this.dbContext = dbContext;
        }
        //this method gives us the list of contacts that are present in a db
        [HttpGet]
        public IActionResult GetAllContact() 
        {
            var contacts = dbContext.Contacts.ToList();
            return Ok(contacts);
        }

        [HttpPost]
        public IActionResult AddContact(AddContactRequestDTO request)
        {
            var domainModelContact = new Contact
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                Email = request.Email,
                PhoneNumber = request.PhoneNumber,
                Favorite = request.Favorite,
            };
            dbContext.Contacts.Add(domainModelContact);
            dbContext.SaveChanges();
            return Ok(domainModelContact);
        }

        [HttpDelete]
        [Route("{id:guid}")]
        public IActionResult DeleteContact(Guid id) {
            var contact = dbContext.Contacts.Find(id);
            if(contact is not null )
            {
                dbContext.Contacts.Remove(contact);
                dbContext.SaveChanges();
            }
            return Ok(contact);
        }
    }
}
